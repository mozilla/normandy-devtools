import PropTypes from "prop-types";
import React, { useContext } from "react";
import {
  Col,
  ControlLabel,
  Divider,
  FormGroup,
  HelpBlock,
  Icon,
  IconButton,
  Input,
  InputNumber,
  Panel,
  Row,
  TagPicker,
} from "rsuite";

import JsonEditor from "devtools/components/common/JsonEditor";
import InputField from "devtools/components/recipes/form/arguments/fields/InputField";
import ToggleField from "devtools/components/recipes/form/arguments/fields/ToggleField";
import ServerErrors from "devtools/components/recipes/form/ServerErrors";
import { layoutContext } from "devtools/contexts/layout";
import {
  ACTION_UPDATE_DATA,
  useRecipeDetailsData,
  useRecipeDetailsDispatch,
} from "devtools/contexts/recipeDetails";

export default function MessagingExperiment() {
  return (
    <>
      <InputField label="Messaging Experiment Slug" name="slug" />

      <ToggleField label="Prevent New Enrollment" name="isEnrollmentPaused">
        Prevents new users from joining the experiment cohort.
        <br />
        Existing users will remain in the experiment.
      </ToggleField>

      <FormGroup>
        <Row>
          <Col xs={24}>
            <Branches />
          </Col>
        </Row>
      </FormGroup>
    </>
  );
}

function Branches() {
  const [branchesUpdated, setBranchesUpdated] = React.useState(Date.now());
  const data = useRecipeDetailsData();
  const dispatch = useRecipeDetailsDispatch();

  const handleClickAddBranch = () => {
    const newBranch = { ratio: 1, slug: "", value: {}, groups: [] };

    dispatch({
      type: ACTION_UPDATE_DATA,
      data: {
        ...data,
        arguments: {
          ...data.arguments,
          branches: [...data.arguments.branches, newBranch],
        },
      },
    });
  };

  let branchesList = (
    <>
      <HelpBlock>There are no branches.</HelpBlock>
      <Divider />
    </>
  );
  if (data.arguments.branches && data.arguments.branches.length) {
    branchesList = data.arguments.branches.map((branch, index) => (
      <Branch
        key={index}
        branchesUpdated={branchesUpdated}
        index={index}
        setBranchesUpdated={setBranchesUpdated}
      />
    ));
  }

  return (
    <FormGroup>
      <ControlLabel>Branches</ControlLabel>
      <Panel bordered>
        {branchesList}
        <ServerErrors field="arguments.branches" />
        <IconButton
          icon={<Icon icon="plus-circle" />}
          onClick={handleClickAddBranch}
        >
          Add Branch
        </IconButton>
      </Panel>
    </FormGroup>
  );
}

function Branch({ index, branchesUpdated, setBranchesUpdated }) {
  const data = useRecipeDetailsData();
  const dispatch = useRecipeDetailsDispatch();
  const { container } = useContext(layoutContext);

  const branch = data.arguments.branches[index];
  const { branches } = data.arguments;

  const handleClickDelete = () => {
    setBranchesUpdated(Date.now());
    dispatch({
      type: ACTION_UPDATE_DATA,
      data: {
        ...data,
        arguments: {
          ...data.arguments,
          branches: branches.filter((b, i) => i !== index),
        },
      },
    });
  };

  const handleChange = (name, cb = (v) => v) => {
    return (value) => {
      dispatch({
        type: ACTION_UPDATE_DATA,
        data: {
          ...data,
          arguments: {
            ...data.arguments,
            branches: branches.map((b, i) => {
              if (i === index) {
                return { ...b, [name]: cb(value) };
              }

              return b;
            }),
          },
        },
      });
    };
  };

  const parseNumericInput = (value) => {
    if (!value) {
      return "";
    }

    return parseInt(value, 10);
  };

  let valueFieldKey = data.recipe && data.recipe.id ? data.recipe.id : "create";
  valueFieldKey += `-${index}-${branchesUpdated}`;

  const errorPrefix = `arguments.branches.${index}.`;
  return (
    <>
      <FormGroup>
        <div className="d-flex">
          <div className="pr-2">
            <ControlLabel>&nbsp;</ControlLabel>
            <IconButton
              circle
              color="red"
              icon={<Icon icon="trash" />}
              size="sm"
              onClick={handleClickDelete}
            />
          </div>
          <div className="flex-grow-1">
            <FormGroup className="d-flex">
              <div className="pr-1">
                <ControlLabel>Ratio</ControlLabel>
                <InputNumber
                  min={1}
                  style={{
                    width: "80px",
                  }}
                  value={branch.ratio}
                  onChange={handleChange("ratio", parseNumericInput)}
                />
                <ServerErrors field={errorPrefix + "ratio"} />
              </div>
              <div className="flex-grow-1">
                <ControlLabel>Branch Slug</ControlLabel>
                <Input value={branch.slug} onChange={handleChange("slug")} />
                <ServerErrors field={errorPrefix + "slug"} />
              </div>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Groups</ControlLabel>
              <TagPicker
                block
                cleanable
                creatable
                container={container}
                data={branch.groups.map((g) => ({
                  label: g,
                  value: g,
                }))}
                value={branch.groups}
                onChange={handleChange("groups")}
              />
              <ServerErrors field={errorPrefix + "groups"} />
            </FormGroup>
            <FormGroup className="cm-height-8">
              <ControlLabel>Value</ControlLabel>
              <JsonEditor
                key={valueFieldKey}
                value={branch.value}
                onChange={handleChange("value")}
              />
              <ServerErrors field={errorPrefix + "value"} />
            </FormGroup>
          </div>
        </div>
      </FormGroup>
      <Divider />
    </>
  );
}

Branch.propTypes = {
  branchesUpdated: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  setBranchesUpdated: PropTypes.func.isRequired,
};

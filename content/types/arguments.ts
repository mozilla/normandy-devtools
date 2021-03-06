import { RatioInput } from "devtools/utils/recipes";

export type ActionArguments =
  | ConsoleLogArguments
  | BranchedAddonStudyArguments
  | MultiPreferenceExperimentArguments
  | PreferenceRolloutArguments
  | UnknownArguments;

export interface ConsoleLogArguments {
  message: string;
}

export interface BranchedAddonStudyArguments {
  slug: string;
  userFacingName: string;
  userFacingDescription: string;
  branches: Array<BranchedAddonStudyBranch>;
  isEnrollmentPaused: boolean;
}

export interface BranchedAddonStudyBranch {
  slug: string;
  ratio: number;
  extensionApiId: number;
}

export interface MultiPreferenceExperimentArguments {
  slug: string;
  branches: Array<MultiPreferenceExperimentBranch>;
  isEnrollmentPaused: boolean;
  isHighPopulation: boolean;
  userFacingName: string;
  userFacingDescription: string;
  experimentDocumentUrl: string;
}

export interface MultiPreferenceExperimentBranch extends RatioInput {
  slug: string;
  ratio: number;
  preferences: MultiPreferenceExperimentPrefs;
}

export interface MultiPreferenceExperimentPrefs {
  [key: string]: {
    preferenceBranchType: "default" | "user";
    preferenceType: "string" | "boolean" | "integer";
    value: string | boolean | number;
  };
}

export interface PreferenceRolloutExperimentArguments {
  preferences: Array<PreferenceRolloutBranch>;
  slug: string;
}

export interface PreferenceRolloutBranch {
  preferenceName: string;
  value: string | boolean | number;
}

export interface SinglePreferenceExperimentArguments {
  slug: string;
  experimentDocumentUrl: string;
  preferenceName: string;
  preferenceType: "string" | "integer" | "boolean";
  preferenceBranchType: "user" | "default";
  isHighPopulation: boolean;
  isEnrollmentPaused: boolean;
  branches: Array<SinglePreferenceExperimentBranch>;
}

export interface SinglePreferenceExperimentBranch {
  slug: string;
  value: string | number | boolean;
  ratio: number;
}

export interface PreferenceRolloutArguments {
  slug: string;
  preferences: Array<PreferenceRolloutPrefs>;
}

export interface PreferenceRolloutPrefs {
  preferenceName: string;
  value: string | number | boolean;
}

export interface ShowHeartbeatArguments {
  surveyId: string;
}

export type UnknownArguments = Record<string, unknown>;

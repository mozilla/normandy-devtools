import { ActionArguments } from "devtools/types/arguments";
import { FilterObject } from "devtools/types/filters";

export interface RecipeV3<T = ActionArguments, F = FilterObject> {
  id: number;
  latest_revision: Revision<T, F>;
  approved_revision: Revision<T, F> | null;
}

export interface RecipeV1<T = ActionArguments> {
  id: string;
  name: string;
  enabled: boolean;
  is_approved: boolean;
  revision_id: number;
  action: string;
  arguments: T;
  filter_expression: string;
}

export interface RecipeReference {
  id: number;
  approved_revision_id: number;
  latest_revision_id: number;
}

export interface Revision<T = ActionArguments, F = FilterObject> {
  action: Action;
  approval_request: ApprovalRequest;
  arguments: T;
  comment: string;
  creator: User;
  date_created: string;
  enabled: boolean;
  experimenter_slug: string;
  extra_filter_expression: string;
  filter_expression: string;
  filter_object: Array<F>;
  id: number;
  is_approved: boolean;
  name: string;
  updated: string;
  recipe: RecipeReference;
}

export interface ApprovalRequest {
  id: number;
  approved: boolean | null;
  approver: User | null;
  comment: string | null;
  created: string;
  creator: User;
  revision: RevisionApprovalRequest;
}

export interface RevisionApprovalRequest {
  id: number;
  recipe_id: number;
}

export interface Action {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

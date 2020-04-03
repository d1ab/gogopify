import { createAction } from "typesafe-actions";
import utilityConstants from "store/constants/utility.constants";

export const resetStateError = createAction(
    utilityConstants.RESET_STATE_ERROR
)();

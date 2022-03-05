/* eslint-disable prettier/prettier */

import { useHistory } from "react-router-dom";
import _ from "@lodash";

function AuthActionPage() {
    const history = useHistory();

    const { search } = window.location;
    const params = new URLSearchParams(search);
    const mode = params.get("mode");
    const code = params.get("oobCode");

    // Handle the user management action.
    switch (mode) {
        case "resetPassword":
            // Display reset password handler and UI.
            history.push(`/reset-password?oobCode=${code}`);
            break;
        // case 'recoverEmail':
        //   // Display email recovery handler and UI.
        //   handleRecoverEmail(auth, actionCode, lang);
        //   break;
        case "verifyEmail":
            // Display email verification handler and UI.
            history.push(`/verify-email?oobCode=${code}`);
            break;
        default:
        // Error: invalid mode.
    }

    return null;
}

export default AuthActionPage;

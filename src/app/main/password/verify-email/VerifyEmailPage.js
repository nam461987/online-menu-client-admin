/* eslint-disable prettier/prettier */
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import firebaseService from "app/services/firebaseService";
import { useState, useEffect } from "react";

const SuccessUI = () => {
    return (
        <div className="flex flex-col flex-1 items-center justify-center p-16">
            <div className="max-w-512 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        transition: { delay: 0.1 },
                    }}
                >
                    <Typography
                        variant="h3"
                        color="inherit"
                        className="font-medium mb-16"
                    >
                        Your email has been verified
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                >
                    <Typography
                        variant="h6"
                        color="textSecondary"
                        className="mb-16 font-normal"
                    >
                        You can now sign in with your new account
                    </Typography>
                </motion.div>

                <Link className="font-normal" to="/login">
                    Go back to login
                </Link>
            </div>
        </div>
    );
};

const ErrorUI = (props) => {
    return (
        <div className="flex flex-col flex-1 items-center justify-center p-16">
            <div className="max-w-512 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        transition: { delay: 0.1 },
                    }}
                >
                    <Typography
                        variant="h3"
                        color="inherit"
                        className="font-medium mb-16"
                    >
                        Failed to verify
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                >
                    <Typography
                        variant="h6"
                        color="textSecondary"
                        className="mb-16 font-normal"
                    >
                        This can happen if the email is malformed, expired, or
                        has already been used.
                    </Typography>
                </motion.div>

                <Link className="font-normal" to="/login">
                    Go back to login
                </Link>
            </div>
        </div>
    );
};

const VerifyEmailPage = () => {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const code = params.get("oobCode");

    const [err, setErr] = useState();

    useEffect(() => {
        const applyCode = async () => {
            const response = await firebaseService.auth
                .applyActionCode(code)
                .then()
                .catch((error) => error);
            setErr(response);
        };
        applyCode();
    }, [code]);

    if (!code) {
        return false;
    }

    if (!firebaseService.auth) {
        console.warn(
            "Firebase Service didn't initialize, check your configuration"
        );

        return () => false;
    }

    return err ? <ErrorUI /> : <SuccessUI />;
};

export default VerifyEmailPage;

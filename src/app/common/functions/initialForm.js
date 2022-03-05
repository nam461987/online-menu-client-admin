/* eslint-disable array-callback-return */
/* eslint-disable prettier/prettier */
import moment from "moment";

export default function setInitialForm(obj) {
    const initialForm = {};

    obj.fields
        .filter((f) => f.create)
        .map((f) => {
            switch (f.type) {
                case "date":
                    initialForm[f.field] = moment().format(
                        obj.defaultConfig.datePickerFormat
                    );
                    break;
                case "datetime":
                    initialForm[f.field] = moment().format(
                        obj.defaultConfig.isoDateTimeFormat
                    );
                    break;
                case "time":
                    initialForm[f.field] = moment().format(
                        obj.defaultConfig.timeFormat
                    );
                    break;
                default:
                    initialForm[f.field] = "";
            }
        });
    return initialForm;
}

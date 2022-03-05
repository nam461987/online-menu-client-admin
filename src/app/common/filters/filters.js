/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-restricted-globals */
/* eslint-disable func-names */
/* eslint-disable no-extend-native */
/* eslint-disable prettier/prettier */
import { Icon } from "@material-ui/core";
import moment from "moment";

String.prototype.format = function () {
    // eslint-disable-next-line prefer-rest-params
    const args = [].slice.call(arguments);
    return this.replace(/(\{\d+\})/g, function (a) {
        return args[+a.substr(1, a.length - 2) || 0];
    });
};
function formatMoney(amount) {
    let dollars = amount / 100;
    dollars = dollars.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
    return dollars;
}

function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return `${interval} years`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return `${interval} months`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return `${interval} days`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return `${interval} hours`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return `${interval} minutes`;
    }
    return `${Math.floor(seconds)} seconds`;
}

class Filters {
    static svcDate = function (text, config) {
        if (text != null && text !== "") {
            return moment(text).format(config.defaultConfig.dateFormat);
        }
        return "";
    };

    static svcDateTime = function (text, config) {
        if (text != null && text !== "") {
            return moment(text).format(config.defaultConfig.dateTimeFormat);
        }
        return "";
    };

    static svcMoney = function (text) {
        if (isNaN(text)) {
            return 0;
        }
        return formatMoney(text);
    };
    static svcNumber = function (text) {
        const v = parseInt(text, 10);
        if (isNaN(v)) {
            return 0;
        }
        return v.toFixed(0);
    };
    static svcImage = function (text, width, height) {
        let w = parseInt(width, 10);
        if (isNaN(w)) {
            w = 52;
        }
        let h = parseInt(height, 10);
        if (isNaN(h)) {
            h = 52;
        }
        let result = "";
        if (text != "") {
            result =
                "<img className='w-full block rounded' src='{0}' width='{1}' height='{2}' alt='' />".format(
                    text,
                    w,
                    h
                );
        } else {
            result =
                "<img className='w-full block rounded' src='assets/images/ecommerce/product-image-placeholder.png' width='{0}' height='{1}' alt='' />".format(
                    w,
                    h
                );
        }
        return result;
    };
    static svcActive = function (text) {
        const ac = <Icon className="text-green text-20">check_circle</Icon>;
        const iac = <Icon className="text-red text-20">remove_circle</Icon>;
        const v = parseInt(text == null ? 0 : text, 10);
        if (v == 1) {
            return ac;
        }
        if (v == 0) {
            return iac;
        }
    };
    static svcOption = function (text, fieldName, optionUrl) {
        const result = "";
        // switch (typeof optionUrl) {
        //     case "string":
        //         var cacheKey = 'options_' + fieldName + '_' + optionUrl;
        //         var optcache = svcCache.get(cacheKey);
        //         if (typeof (optcache) != "undefined") {
        //             for (var k = 0; k < optcache.length; k++) {
        //                 if (optcache[k].Value == text) {
        //                     result = optcache[k].DisplayText;
        //                 }
        //             }
        //         }
        //         break;
        //     case "object":
        //         var cacheKey2 = 'options_' + fieldName + '_array';
        //         var optcache2 = svcCache.get(cacheKey2);
        //         if (typeof (optcache2) != "undefined") {
        //             for (var k = 0; k < optcache2.length; k++) {
        //                 if (optcache2[k].Value == text) {
        //                     result = optcache2[k].DisplayText;
        //                 }
        //             }
        //         }
        //         break;

        // }

        return result;
    };
    static svcTimeSince = (text) => {
        return moment(moment(text)).fromNow();
    };
}

export default Filters;

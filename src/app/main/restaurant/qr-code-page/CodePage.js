/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grow from '@material-ui/core/Grow';
import FuseLoading from '@fuse/core/FuseLoading';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import QRCode from 'qrcode.react';
import Constants from 'app/common/constants/constants';
import slugify from 'slugify';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BitlyClient } from 'bitly';
import reducer from '../store';
import { getRestaurant } from '../store/restaurantSlice';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function CodePage() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [restaurant, setRestaurant] = useState();
  const [shortUrl, setShortUrl] = useState();
  const restaurantId = useSelector((state) => state.auth.user.restaurantId);
  const bitly = new BitlyClient(process.env.REACT_APP_BITLY_ACCESS_TOKEN, {});
  useEffect(() => {
    dispatch(getRestaurant(restaurantId)).then((response) => {
      setRestaurant(response.payload);
    });
  }, [dispatch, restaurantId]);

  useEffect(() => {
    if (restaurant && (restaurant.Name || restaurant.Id)) {
      const getShortUrl = async () => {
        const result = await bitly.shorten(
          `${Constants.MAIN_PROJECT}/menu/${restaurant.Id}/short-link.html`
        );
        return result;
      };

      getShortUrl().then((res) => setShortUrl(res));
    }
  }, [restaurant]);

  /**
   * Wait while Restaurant data is loading and form is setted
   */
  if (!restaurant) {
    return <FuseLoading />;
  }

  if (!restaurant.Name || !restaurant.Id) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          You should fill out the information form first!
        </Typography>
        <Link className="font-normal mt-20 text-base" to="/apps/restaurant">
          Go to information page
        </Link>
      </motion.div>
    );
  }

  return (
    <div
      className={clsx(
        classes.root,
        'flex flex-col flex-auto items-center justify-center p-16 sm:p-32'
      )}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <Grow in>
          <Card className="w-full max-w-384">
            <CardContent className="flex flex-col items-center justify-center text-center p-16 sm:p-48">
              <img
                className="w-64 mb-32"
                src="assets/images/logos/nt.svg"
                alt="logo"
              />

              <Typography
                variant="subtitle1"
                className="mb-16 text-32 font-semibold"
              >
                SCAN HERE <br />
                -- FOR --
                <br /> MENU
              </Typography>

              {restaurant.Name && restaurant.Id ? (
                <QRCode
                  value={`${Constants.MAIN_PROJECT}/menu/${
                    restaurant.Id
                  }/${slugify(restaurant.Name, {
                    replacement: '-',
                    remove: null,
                    lower: true,
                  })}.html`}
                  renderAs="svg"
                  size={128}
                />
              ) : null}
              {/* <img
                                className="w-256 m-32"
                                src="assets/images/logos/qr-code.svg"
                                alt="qr code"
                            /> */}
            </CardContent>
          </Card>
        </Grow>
        <a
          href={shortUrl?.link}
          className="font-normal mt-20"
          target="_blank"
          rel="noopener noreferrer"
        >
          {shortUrl?.link}
        </a>
      </div>
    </div>
  );
}

export default withReducer('restaurant', reducer)(CodePage);

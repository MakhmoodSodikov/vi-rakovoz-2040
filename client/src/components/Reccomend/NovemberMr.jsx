import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import Popover from "@material-ui/core/Popover";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    "& p": {
      margin: 0,
      fontWeight: "bold",
    },
  },
  gridList: {
    width: 500,
    height: 450,

    "& .MuiGridListTile-root": {
      width: "42%!important",
    },
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
    padding: "5px",
  },
  subtitle: {
    fontSize: "14px",
    lineHeight: "14px",
    height: "48px",

    "& .MuiGridListTileBar-title": {
      height: "42px",
      fontSize: "14px",
      lineHeight: "14px",
      whiteSpace: "inherit",
    },
  },
  popper: {
    width: "250px",
    "& p": {
      margin: "5px",
      fontSize: "14px",
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    padding: "5px",
  },
}));

export const NovemberMr = () => {
  const classes = useStyles();
  let { userId } = useParams();
  const { persons } = useSelector((state) => state.persons);
  const currentData = persons && persons.filter((item) => item.id == userId);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popoverData, setPopoverData] = React.useState(null);

  const handleClickOpenSettings = (event, book) => {
    setAnchorEl(event.currentTarget);
    setPopoverData(book);
  };

  const open = Boolean(anchorEl);
  return (
    currentData.length && (
      <div className={classes.root}>
        <Typography variant="h6" component="h6" className={classes.title}>
          Подборка мероприятий
        </Typography>
        <GridList cellHeight={180} className={classes.gridList}>
          {currentData &&
            currentData.map((item, i) =>
              item.event_recommendations.map((book, i) => (
                <GridListTile key={i}>
                  <img
                    src="https://thumbs.dreamstime.com/z/vector-illustration-background-flat-design-group-people-doing-different-activity-style-196255464.jpg"
                    alt="1"
                    className={classes.img}
                  />
                  <GridListTileBar
                    title={book.event}
                    className={classes.subtitle}
                    actionIcon={
                      <IconButton
                        className={classes.icon}
                        onClick={(e) => handleClickOpenSettings(e, book)}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))
            )}
        </GridList>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <div className={classes.popper}>
            <p>
              <b>Название: </b>
              {popoverData && popoverData.event}
            </p>
            <p>
              <b>Место: </b>
              {popoverData && popoverData.place}
            </p>
            <p>
              <b>Когда: </b>
              {popoverData && popoverData.date}
            </p>
          </div>
          <div className={classes.buttons}>
            <ButtonGroup size="small">
              <Button>Купить билет</Button>
              <Button>Не интересно</Button>
              <Button>В закладки</Button>
            </ButtonGroup>
          </div>
        </Popover>
      </div>
    )
  );
};

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
    padding: "5px",
  },
  img: {
    transform: "translateY(-88px)",
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
}));

export const NovemberBook = () => {
  const classes = useStyles();
  const { persons } = useSelector((state) => state.persons);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClickOpenSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  return (
    persons.length && (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <Typography variant="h6" component="h6" className={classes.title}>
              Подборка книг для осенних вечеров
            </Typography>
          </GridListTile>
          {persons[0]["Рекомендации"].map((book, i) => (
            <GridListTile key={i}>
              <img src={book.img} alt={book.img} className={classes.img} />
              <p>{`Название: ${book["Название"]}`}</p>
              <p>{`Автор: ${book["Автор"]}`}</p>
              <p>{`Жанр: ${book["Жанр"]}`}</p>
              <GridListTileBar
                title={book["Название"]}
                // subtitle={<span>by: sss</span>}
                className={classes.subtitle}
                actionIcon={
                  <IconButton
                    className={classes.icon}
                    onClick={handleClickOpenSettings}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
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
                    {book["Название"]}
                  </p>
                  <p>
                    <b>Автор: </b>
                    {book["Автор"]}
                  </p>
                  <p>
                    <b>Жанр: </b>
                    {book["Жанр"]}
                  </p>
                </div>
              </Popover>
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  );
};

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../../../backend/firebase/firestore/userStoreFunction';
import { useDispatch, useSelector } from 'react-redux';
import OverlayLoading from '../../../../components/OverlayLoading';
import { addAllUser } from '../../../../redux/reducers/userSlice';
import { readUsers } from '../../../../backend/controller/userController';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export function AddMembers({ setMembers }) {
  const [checked, setChecked] = useState([]);
  const [right, setRight] = useState([]);
  const [left, setLeft] = useState([]);
  const [loading, setLoading] = useState(false);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  /** All user form redux */
  const users = useSelector(state => state.users.data)

  const dispatch = useDispatch();
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setMembers(right);
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  useEffect(() => {
    setMembers(right);
  });

  useEffect(() => {
    setLoading(true);
    readUsers()
      .then(res => {
        setLeft(res.data);
        setLoading(false);
      })
  }, []);

  const customList = (title, items) => (
    <Card>
      {/** Header Section */}
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      {/** User Lists Section */}
      <List
        sx={{
          width: '100%',
          marginTop: '5px',
          borderRadius: '10px',
          height: 450,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((user) => {
          const labelId = `transfer-list-all-item-${user.uid}-label`;

          return (
            <ListItem
              key={user.uid}
              role="listitem"
              onClick={handleToggle(user)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(user) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={user.username}
                secondary={user.department}
              />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid
      container
      alignItems="center"
      spacing={1}
      flex={1}
    >
      <Grid flex={1} item >
        {customList('All Members', left)}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            // variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            <ArrowForwardIosOutlinedIcon />
          </Button>
          <Button
            sx={{ my: 0.5 }}
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            <ArrowBackIosOutlinedIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid
        item
        flex={1}
      >
        {customList('Added Members', right)}
      </Grid>
      <OverlayLoading open={loading} />
    </Grid>
  );
}
export default AddMembers;
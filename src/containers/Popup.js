

import React, {Component} from 'react'

import { makeStyles } from '@material-ui/core/styles';

import {
  Typography, 
  FormControl,
  Select, 
  InputLabel, 
  Input, 
  MenuItem,
  Button, 
  Modal
} from '@material-ui/core';

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
  },

  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },


}));

export const SingleProductModal = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState({
    size:0,
    quantity: 0
  })
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setValue(prevProps => ({
      ...prevProps,
      [event.target.name]: event.target.value,
    }));
  }

  const handleClick= () => {
    if(!value.size.available){
      alert("Size is Out of Stock");
    }
    else if(value.quantity <= value.size.inventory){
      handleClose()
      props.addToCart(props.product, value.size, value.quantity)
    }
    else{
      alert("not available")
    }
  }

  return (
    
    <div>
      <Button onClick={handleOpen}  variant="contained">
        Buy
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
          <div style={modalStyle} className={classes.paper}>
            <div style={{display:'flex', justifyContent:'center', flexDirection:'column', textAlign: 'center', alignItems: 'center'}}>
              <img src={props.product.searchImage} alt="Smiley face" style={{height:'200px', width:'200px'}} />
			        <Typography gutterBottom variant="h6" component="h5">
			          {props.product.product}
			        </Typography>
			        <Typography>
			          Rs. {props.product.price}
			        </Typography>

			        <form className={classes.root} autoComplete="off">
			          <FormControl className={classes.formControl}>
								  <InputLabel htmlFor="skuitem-helper">Size*</InputLabel>
                    <Select
                      value={value.size}
                      onChange={handleChange}
                      input={<Input name="size" id="skuitem-helper" />}
                    >
                      {
                        props.product.inventoryInfo.map(key =>
                          <MenuItem key={key.skuId} value={key}>{key.label}</MenuItem>
                        )
                      }
								    </Select>
							  </FormControl>
							  
                <FormControl className={classes.formControl}>
								  <InputLabel htmlFor="quantity-helper">Quantity*</InputLabel>
                    <Select
                      value={value.quantity}
                      onChange={handleChange}
                      input={<Input name="quantity" id="quantity-helper" />}
                    >
                      {
                            [...Array(5)].map((key, value) =>
                            <MenuItem key={value} value={value+1}>{value+1}</MenuItem>
                            )
                      }
								    </Select>
							  </FormControl>
					    </form>
                <Button onClick = {handleClick} variant="contained">
                    Add to Cart
                </Button>
            </div>
          </div>
      </Modal>
    </div>
  )
}

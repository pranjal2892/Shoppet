
import React from 'react'


import {
  Container ,
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  CardActionArea, 
  CardActions, 
  Button } from '@material-ui/core';

import {SingleProductModal} from './Popup.js'


class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      products : [],
      toggle_buy : false,
      available_qty : 0,
      cart : [],
	    total : 0,
    }
  }

  componentDidMount = () => {
    fetch('http://images.stockal.com/api/products.json')
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        products : data.data.products
      })
    })
  }

  toggleBuy = (index) => {
    let products = this.state.products
    products[index]['open'] = !products[index]['open']
    console.log(products[index]['open'])
    this.setState({products})
  }

  addToCart = (product, size, quantity) => {
    console.log('index of card',product,size,quantity);
    if(this.state.cart.length >= 5){
      alert("you cant add more than 5 items")
    }
    else{
      this.setState({
        total : this.state.total+(product.price*quantity),
        cart: [...this.state.cart, {product, size, quantity}]
      })
    }
  }

  removeFromCart = (item,index) => {
    let cart = [...this.state.cart]
    cart.splice(index,1)
    let total = this.state.total - (item.product.price*item.quantity)
    this.setState({
      cart : cart,
      total : total
    })
  }

  render(){
    let {products,cart,total} = this.state
    console.log("cart value", cart)
    return(
    <div>
      <Container>
        <p><font size="4"><strong>Cart</strong></font></p> 
        <p><font size="2">Total : Rs.{total} </font></p> 
        {cart.length ==0 ? <p><font size="4">It feels so ligh Here !!</font></p> : null}
        <hr/>
        <Grid container spacing={2}>
          {cart.length > 0 ? cart.map((data,index) => (	
            <Grid item xs={2} key={index} > 	          		
              <Card  style={{maxWidth:'290px', height:'380px'}}>
                <CardActionArea>
                  <CardMedia
                    style={{height:'155px'}}
                    image={data.product.searchImage}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom  style={{height:'60px',fontSize:"14px"}}>
                      {data.product.product}
                    </Typography>
                    <Typography gutterBottom>
                      Quantity:{data.quantity}
                    </Typography>
                    <Typography gutterBottom>
                        Size: {data.size.label}
                    </Typography>
                    <Typography gutterBottom  style={{fontSize: '14px'}}>
                      Rs. {data.product.price}
                    </Typography>
                  </CardContent>
                  </CardActionArea>
                  <Button style={{display: 'table', marginLeft: 'auto', marginRight: 'auto'}} onClick={() => this.removeFromCart(data,index)} variant="contained">
                    Remove
                  </Button>
                </Card>
              </Grid>
                )) : null
            } 
					    </Grid>
			</Container>
      <Container style={{marginTop:'10px'}}>
        <Grid container spacing={2}>
        {
          products && products.length > 0 ? products.map((product, index) =>
            <Product_List
              key={index}
              product = {product}
              index = {index}
              toggleBuy = {this.toggleBuy}
              onChange={this.onChange}
              addToCart={this.addToCart}
            />
          ) : null
        }
      </Grid>
    </Container>
    </div>
    )
  }
}

const Product_List = (props) => {
  let {product} = props
  return(
    
    <Grid item xs={3}> 
      <Card style={{maxWidth:'290px', height:'370px'}}>
      <CardActionArea>
        <CardMedia
          style={{height:'200px'}}
          image={product.searchImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom  style={{height:'50px'}}>
            {product.product}
          </Typography>
          <Typography gutterBottom  style={{fontSize: '14px'}}>
            Rs. {product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
        <CardActions>
          <SingleProductModal {...props} />
        </CardActions>
      </Card>
		</Grid>
  )
}


export default Home

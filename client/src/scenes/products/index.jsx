import React, {useState} from 'react';
import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery} from "@mui/material"
import Header from "component/Header"
import { useGetProductsQuery } from 'state/api';

const Product = ({
    _id,
    name,
    description,
    price,
    rating,
    category,
    supply,
    stat
}) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card
        sx = {{
            backgroundImage: "none",
            backgroundColor: theme.palette.background.alt,
            // the reason why we use theme.pal... is because material ui will 
            // automatically the dark or light mode version of these colours when theme switch
            borderRadius: "0.55rem"
        }}
        >
            <CardContent>
                <Typography sx={{ fontSize: 14}} color={theme.palette.secondary[700]} gutterBottom>
                    {category}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{mb: "1.5rem"}} color={theme.palette.secondary[400]}>
                    ${Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly/>

                <Typography variant="body2">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="primary"
                    size="small"
                    onClick={()=> setIsExpanded(!isExpanded)}
                >
                    See More
                </Button>
            </CardActions>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit sx={{color: theme.palette.neutral[300]}}>
                <CardContent>
                    <Typography>id: {_id}</Typography>
                    <Typography>Supply Left: {supply}</Typography>
                    <Typography>Yearly Sales This Year: {stat.yearlySalesTotal}</Typography>
                    <Typography>Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

const Products = () => {
    const {data, isLoading} = useGetProductsQuery();
    const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    // rem = root em, everything remains proportional to the initial starting point.
    // thus consistent across browsers
    <Box m="1.5rem 2.5rem">
        <Header title="PRODUCTS" subtitle="See your list of products."/>
        {/* repeat a set of columns split into in 4 and give minmax, min of 0 and 1fr as max
        if it get's too small it allows to decrease further.*/}
        {data || !isLoading ? (
            <Box 
            mt="20px" 
            display="grid" 
            gridTemplateColumns="repeat(4, minmax(0, 1fr))" 
            justifyContent="space-between" 
            rowGap="20px" 
            columnGap="1.33%"
            sx={{
                "& > div": {gridColumn: isNonMobile ? undefined: "span 4"}
                // & target the immediate div we can set it so that
                // if it's desktop no setting but mobile takes entire width
                // so every child component will have a span of 4
            }}>

                {data.map(({
                    _id,
                    name,
                    description,
                    price,
                    rating,
                    category,
                    supply,
                    stat
                }) => (
                    <Product
                    key={_id}
                    _id={_id}
                    name={name}
                    description={description}
                    price={price}
                    rating={rating}
                    category={category}
                    supply={supply}
                    stat={stat}
                    />
                ))}

            </Box>
        ):<>Loading...</>}
    </Box>
  )
}

export default Products;
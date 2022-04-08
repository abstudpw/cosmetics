import {useParams} from "react-router";
import {cosmeticsData} from "../data/cosmetics-data";
import {Cosmetic} from "../model/cosmetic";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Details from "./Details";
import CardActions from "@mui/material/CardActions";
import {Link} from "react-router-dom";
import Copyrights from "./Copyrights";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import * as React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";

export default function Product() {

    const theme = createTheme();
    const params = useParams();
    const cards = useSelector((state: RootState) => state.productReducer.data)
    const card = cards.find((value: any) => value.id.toString() === params.id);
    const product = card ? card : null;

    return product ? (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 5,
                        pb: 1,
                        marginBottom: '1%',
                    }}
                >
                    <Container maxWidth="md">
                        <Grid container spacing={2}>
                            <Grid xs={6}>
                            <CardMedia
                                component="img"
                                sx={{
                                    // 16:9
                                    width: '80%'
                                }}
                                image={product? product.img : 'NONE'}
                                alt="Photo"
                            />
                            </Grid>
                            <Grid xs={6}>
                                <Card
                                    sx={{display: 'flex', height: '250px', border: "none", boxShadow: "none" }}
                                >
                                    <Box sx={{ display: 'flex', flexDirection: 'column'}} >
                                        <CardContent>
                                            <Typography align={'left'} gutterBottom variant="h6" component="h2" sx={{marginBottom: '10%'}}>
                                                {product? product.name : ''}
                                            </Typography>
                                            <Typography align={'left'} variant="body1" color="text.secondary" sx={{marginBottom: '5%'}}>
                                                Pojemność: {product? product.volume : ''}
                                            </Typography>
                                            <Typography align={'left'} variant="body1" color="text.secondary" sx={{marginBottom: '5%'}}>
                                                Cena: {product? product.price : ''} zł
                                            </Typography>
                                            <Link to={`/`} style={{alignContent: 'left'}}><Button size="small">Wróć</Button></Link>
                                        </CardContent>
                                    </Box>

                                </Card>
                        </Grid>
                        </Grid>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                        <Card
                            sx={{display: 'flex', border: "none", boxShadow: "none" }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography variant="body1" color="text.secondary">
                                        {product? product.shortDescription : ''}
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>

                    <Card
                        sx={{display: 'flex', border: "none", boxShadow: "none" }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography gutterBottom variant="h6" component="h2">
                                    Składniki
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product?  product.ingredients : ''}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>

                    <Card
                        sx={{display: 'flex', border: "none", boxShadow: "none" }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography gutterBottom variant="h6" component="h2">
                                    Sposób użycia
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product? product.methodOfUse : ''}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>

                    <Card
                        sx={{display: 'flex', border: "none", boxShadow: "none" }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography gutterBottom variant="h6" component="h2">
                                    Szczegółówy opis
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product? product.description : ''}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Container>
            </main>
        </ThemeProvider>
    )
        : (<Typography gutterBottom variant="h6" component="h2">Nie ma takiego produktu</Typography>)
}
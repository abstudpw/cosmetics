import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Details from "./Details";
import {Link} from "react-router-dom";
import Copyrights from "./Copyrights";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {Menu, MenuItem, Slider} from "@mui/material";
import Remove from "./Remove";

const theme = createTheme();

export default function Home() {

    const dispatch = useDispatch();
    const cards = useSelector((state: RootState) => state.productReducer.display)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (value: any) => {
        if (value != null) {
            Promise.resolve(dispatch({type: 'sort1', sort: value}))
                .then(() => dispatch({type: 'sort2'}))
        }
        setAnchorEl(null);
    };

    const [valuePrice, setValuePrice] = React.useState<number[]>([0, 300]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValuePrice(newValue as number[]);
        console.log(newValue)
        const updatedValue = newValue as number[];
        Promise.resolve(dispatch({type: 'range1', min: updatedValue[0], max: updatedValue[1]}))
            .then(() => dispatch({type: 'range2'}))
    };

    function valuetext(valueText: number) {
        return `${valueText} zł`;
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Projekt Kosmetyki 2022
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Lista dostępnych produktów na stronie
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Grid container spacing={2} justifyContent={'center'}>
                                <Grid item xs={12}>
                                    <div>
                                        <Button
                                            id="demo-positioned-button"
                                            aria-controls="demo-positioned-menu"
                                            aria-haspopup="true"
                                            aria-expanded={openMenu ? 'true' : undefined}
                                            onClick={handleClick}
                                        >
                                            Sortuj
                                        </Button>
                                        <Menu
                                            id="demo-positioned-menu"
                                            aria-labelledby="demo-positioned-button"
                                            anchorEl={anchorEl}
                                            open={openMenu}
                                            onClose={() => handleClose(null)}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <MenuItem onClick={() => handleClose('+name')}>Po nazwie rosnąco</MenuItem>
                                            <MenuItem onClick={() => handleClose('-name')}>Po nazwie malejąco</MenuItem>
                                            <MenuItem onClick={() => handleClose('+price')}>Po cenie rosnąco</MenuItem>
                                            <MenuItem onClick={() => handleClose('-price')}>Po cenie malejąco</MenuItem>
                                            <MenuItem onClick={() => handleClose('+volume')}>Po pojemności rosnąco</MenuItem>
                                            <MenuItem onClick={() => handleClose('-volume')}>Po pojemności malejąco</MenuItem>
                                        </Menu>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ width: 300, display: 'inline-block' }}>
                                        <Typography gutterBottom>Zakres cen</Typography>
                                        <Slider
                                            getAriaLabel={() => 'Zakres ceny'}
                                            value={valuePrice}
                                            onChange={handleChange}
                                            valueLabelDisplay="auto"
                                            getAriaValueText={valuetext}
                                            sx={{display: 'inline-block', margin: '0 auto'}}
                                            defaultValue={[0, 300]}
                                            min={0}
                                            max={300}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map((card: any) => (
                            <Grid item key={card.id} xs={12} sm={12} md={12}>
                                <Card
                                    sx={{display: 'flex', height: '250px'}}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            width: '40%'
                                        }}
                                        image={card.img}
                                        alt="Photo"
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }} >
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography gutterBottom variant="h6" component="h2">
                                            {card.name}
                                        </Typography>
                                        <Typography>
                                            Pojemność: {card.volume} ml
                                        </Typography>
                                        <Typography>
                                            Cena: {card.price} zł
                                        </Typography>
                                        <Typography>
                                            {<Details title={'Składniki'} details={card.ingredients}/>}
                                        </Typography>
                                        <Typography>
                                            {<Details title={'Sposób użycia'} details={card.methodOfUse}/>}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link to={`/product/${card.id}`}><Button size="small">Szczegóły</Button></Link>
                                        <Link to={`/product/edit/${card.id}`}><Button size="small">Edytuj</Button></Link>
                                        <Remove id={card.id} />
                                    </CardActions>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Kosmetyki 2022
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Projekt Architektury i technologie systemów internetowych
                </Typography>
                <Copyrights />
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}

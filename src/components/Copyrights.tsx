import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyrights() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Adrian Buller | Architektury i technologie systemów internetowych
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
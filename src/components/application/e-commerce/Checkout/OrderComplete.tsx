import Image from 'next/image';
import { forwardRef, useState } from 'react';
import Link from 'Link';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Dialog, Divider, Grid, MenuItem, Stack, TextField, Typography, Zoom, ZoomProps, useMediaQuery } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// third-party
import { Chance } from 'chance';

// assets
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { CartCheckoutStateProps } from 'types/cart';
const completed = '/assets/images/e-commerce/completed.png';

const chance = new Chance();

const Transition = forwardRef((props: ZoomProps, ref) => <Zoom ref={ref} {...props} />);

// ==============================|| CHECKOUT CART - DISCOUNT COUPON CODE ||============================== //

const OrderComplete = ({ open, checkout }: { open: boolean; checkout: CartCheckoutStateProps }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

  const [step, setStep] = useState(0);

  const [bank, setBank] = useState('');

  const [account, setAccount] = useState('');

  const cities = [
    {
      value: 'KB',
      label: 'KB Kookmin'
    }
  ];

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      maxWidth="md"
      sx={{
        '& .MuiDialog-paper': {
          p: 0
        }
      }}
    >
      {open && step === 0 && (
        <MainCard>
          <Grid container direction="column" spacing={gridSpacing} alignItems="center" justifyContent="center" sx={{ py: 4, px: 2 }}>
            {/* 타이틀 문구 */}
            <Grid item>
              <Stack alignItems="center" spacing={1}>
                <Typography align="center" variant="h5" sx={{ color: 'text.secondary' }}>
                  To issue a Virtual Account, please provide the depositor’s bank account information.
                </Typography>
                <Typography align="center" variant="h5" sx={{ color: 'text.secondary' }}>
                  Please note that deposits will only be accepted from the registered account.
                </Typography>
              </Stack>
            </Grid>

            {/* 입력폼 */}
            <Grid item xs={12} sx={{ mt: 3, width: { xs: '90%', sm: '70%', md: '50%' } }}>
              <Stack spacing={2}>
                <TextField fullWidth label="Account number" value={account} onChange={(e) => setAccount(e.target.value)} />
                <TextField select label="Bank" value={bank} fullWidth onChange={(e) => setBank(e.target.value)}>
                  {cities.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField fullWidth label="Account holder's name" />
                <TextField fullWidth label="Date of birth" />
              </Stack>
            </Grid>

            {/* 구분선 */}
            <Grid item xs={12} sx={{ mt: 4, width: '100%' }}>
              <Divider />
            </Grid>

            {/* 버튼 */}
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Button variant="contained" size="large" onClick={() => setStep(1)}>
                Next
              </Button>
            </Grid>
          </Grid>
        </MainCard>
      )}
      {open && step === 1 && (
        <MainCard>
          <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ py: 4, px: 2 }} spacing={gridSpacing}>
            {/* 안내 문구 및 정보 */}
            <Grid item xs={12} sm={9} sx={{ mt: 3 }}>
              <Box
                sx={{
                  backgroundColor: 'grey.100',
                  borderRadius: 2,
                  p: 3,
                  maxWidth: { xs: '100%', sm: 720 }, // ⬅ 폭 늘림
                  width: '100%'
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" color="text.primary">
                    Transfer <b>{checkout.total.toLocaleString()}₩</b> to:
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Account number:</strong> {account || '123456789'}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Bank:</strong> {bank || 'KB Kookmin'}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" style={{ opacity: 0, height: 0 }}>
                    awefwaefawefwafwafwfewfwefwewfwefwefwef
                  </Typography>
                </Stack>
              </Box>
            </Grid>

            {/* 안내 메시지 */}
            <Grid item xs={12} sm={9} sx={{ mt: 3 }}>
              <Box
                sx={{
                  backgroundColor: 'grey.100',
                  borderRadius: 2,
                  p: 2,
                  maxWidth: 640,
                  width: '100%',
                  textAlign: 'center',
                  boxShadow: 0.5
                }}
              >
                <Stack alignItems="center" spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    Please process the payment from the official <b>{bank || 'your bank'} app</b>.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Make sure to enter the correct account number.
                  </Typography>
                </Stack>
              </Box>
            </Grid>

            {/* 구분선 */}
            <Grid item xs={12} sx={{ mt: 3, width: '100%' }}>
              <Divider />
            </Grid>

            {/* 버튼 */}
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Grid container direction={matchDownMD ? 'column-reverse' : 'row'} spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12} md="auto">
                  <Button variant="contained" size="large" onClick={() => setStep(2)} fullWidth={matchDownMD}>
                    I transferred funds
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      )}

      {open && step === 2 && (
        <MainCard>
          <Grid container direction="column" spacing={gridSpacing} alignItems="center" justifyContent="center" sx={{ my: 3 }}>
            <Grid item xs={12}>
              <Typography variant={matchDownMD ? 'h2' : 'h1'}>Payment completed</Typography>
            </Grid>

            <Grid item xs={12} sx={{ m: 3 }}>
              <Box sx={{ position: 'relative', width: { xs: '200px', md: '400px' }, height: { xs: '112px', md: '223px' } }}>
                <Image src={completed} alt="Order Complete" width={'100%'} height={'100%'} layout="fill" />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Grid
                direction={matchDownMD ? 'column-reverse' : 'row'}
                container
                spacing={3}
                alignItems={matchDownMD ? '' : 'center'}
                justifyContent="space-between"
              >
                <Grid item>
                  <Button component={Link} href="/app/e-commerce/products" variant="contained" fullWidth>
                    completed
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      )}
    </Dialog>
  );
};

export default OrderComplete;

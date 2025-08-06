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
import CurrencyFormat from 'react-currency-format';
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
      value: 'HANA',
      label: 'HANA'
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
            {/* 안내 문구 */}
            <Grid item>
              <Stack alignItems="center" spacing={1}>
                <Typography align="center" variant="h5" sx={{ color: 'text.primary', fontWeight: 600 }}>
                  Please enter your bank account information
                </Typography>
                <Typography align="center" variant="body1" sx={{ color: 'text.secondary' }}>
                  Virtual account deposits are only accepted from the registered account.
                </Typography>
                <Typography align="center" variant="body2" sx={{ color: 'text.disabled' }}>
                  ※ Make sure to enter your own account information accurately.
                </Typography>
              </Stack>
            </Grid>

            {/* 입력 폼 */}
            <Grid item xs={12} sx={{ mt: 4, width: '80%' }}>
              <Stack spacing={2}>
                {/* 계좌번호 */}
                <Box display="flex" alignItems="center">
                  <Box minWidth="100px">
                    <Typography>Account number</Typography>
                  </Box>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Numbers only"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                  />
                </Box>

                {/* 은행 선택 */}
                <Box display="flex" alignItems="center">
                  <Box minWidth="160px">
                    <Typography>Select bank</Typography>
                  </Box>
                  <TextField fullWidth size="small" select value={bank} onChange={(e) => setBank(e.target.value)}>
                    {cities.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                {/* 예금주 */}
                <Box display="flex" alignItems="center">
                  <Box minWidth="160px">
                    <Typography>Account holder name</Typography>
                  </Box>
                  <TextField fullWidth size="small" />
                </Box>

                {/* 생년월일 */}
                <Box display="flex" alignItems="center">
                  <Box minWidth="160px">
                    <Typography>Date of birth (YYMMDD)</Typography>
                  </Box>
                  <TextField fullWidth size="small" placeholder="e.g. 900101" />
                </Box>
              </Stack>
            </Grid>

            {/* 구분선 */}
            <Grid item xs={12} sx={{ mt: 4, width: '100%' }}>
              <Divider />
            </Grid>

            {/* 버튼 */}
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Button variant="contained" size="large" onClick={() => setStep(1)} disabled={!bank || !account}>
                Proceed to Next Step
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
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <Typography variant="h5" color="text.primary">
                      Transfer
                    </Typography>
                    <Typography variant="subtitle1">
                      <b>{checkout.subtotal}</b> KRW
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <strong>Account number:</strong>
                    <b>{account}</b>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <strong>Bank:</strong>
                    <b> {bank}</b>
                  </div>
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

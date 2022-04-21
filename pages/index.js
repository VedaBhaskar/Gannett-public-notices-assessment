import Head from 'next/head'
import { Container, Grid, Typography } from '@mui/material'

export default function Home() {
  // URL for submitting the input form
  const submission_url = "/api/submit";

  return (
    <Container>
      <Head>
        <title>Public Notices</title>
        <meta name="description" content="Public Notices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid>
        <Typography variant="h1">
          Public Notices
        </Typography>
      </Grid>
      <Grid>
        {/* Place user feedback messages here */}
      </Grid>
      <Grid>
        <Typography>
          Please enter your information into the submission form below and click &quot;Submit&quot; when finished.
        </Typography>
        {/* Input form should go here */}
      </Grid>
      <Grid>
        {/* Place submitted notice here */}
      </Grid>
    </Container>
  )
}

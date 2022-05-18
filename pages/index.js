import Head from 'next/head'
import { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material'

import SubmissionForm from '../components/submission_form'
import AlertBanner from '../components/alert_banner'
import Link from 'next/link'

export default function Home() {
  // URL for submitting the input form
  const submission_url = "/api/submit";
  const [postRequestDetails, setPostRequestDetails] = useState({});

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
        {'message' in postRequestDetails &&
          <AlertBanner
            status={postRequestDetails.status}
            message={postRequestDetails.message}
          />
        }
      </Grid>
      <Grid>
        <Typography lineHeight={4}>
          Please enter your information into the submission form below and click &quot;Submit&quot; when finished.
        </Typography>
        <SubmissionForm
          submission_url={submission_url}
          setPostRequestDetails={setPostRequestDetails}
        />
      </Grid>
      <Grid>
        <Typography variant="h1">
          Submissions
        </Typography>
        <Link href="/submissions">
          <a>View Submissions</a>
        </Link>
      </Grid>
    </Container>
  )
}

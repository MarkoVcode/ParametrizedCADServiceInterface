import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import useConfig from "./useConfig";

export default function Home() {
  const config = useConfig();
  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper square={false} elevation={4}
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 347,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to [Your Service Name]!
          </Typography>

          <Typography variant="body1" paragraph>
            We’re thrilled to have you here! [Your Service Name] is a free online platform where you can explore, modify, and download a wide range of parametrized 3D objects. Whether you’re a hobbyist, a designer, or someone new to 3D printing, our collection of customizable models is designed to help you bring your ideas to life.
          </Typography>

          <Typography variant="body1" paragraph>
            Our goal is to make 3D printing accessible to everyone. You can easily tweak the parameters of each model to suit your needs, then download the file ready for printing. It’s simple, flexible, and completely free to use.
          </Typography>

          <Typography variant="h6" component="h2" gutterBottom>
            Happy Printing!
          </Typography>

          <Typography variant="body2" color="textSecondary">
            The [Your Service Name] Team
          </Typography>
        </Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>

       <Box
          component="img"
          sx={{
            height: 'auto',
            width: '100%',
            maxWidth: 269,
            borderRadius: 1,
            boxShadow: 4,
          }}
          alt="Example of a 3D object"
          src="http://localhost:8080/tocmain1.png" // Replace with your image URL
        />
   
      </Grid>
      <Grid item xs={12}>
        <Paper square={false} elevation={4} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Terms and Conditions
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Effective Date: <b>10.08.2024</b>
          </Typography>

          <Typography variant="h6" component="h2" gutterBottom>
            1. Introduction
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to <b>thingoncloud.com</b> ("we," "our," or "us"). This service is provided as a hobby project and is available to you free of charge. By using this service, you agree to these Terms and Conditions. If you do not agree, please do not use our service.
          </Typography>

          <Typography variant="h6" component="h2" gutterBottom>
            2. Free of Charge
          </Typography>
          <Typography variant="body1" paragraph>
            This service is provided at no cost to you. You may use it freely, but we do not offer any premium or paid versions.
          </Typography>

          <Typography variant="h6" component="h2" gutterBottom>
            3. No Warranty
          </Typography>
          <Typography variant="body1" paragraph>
            This service is provided "as is" and without any warranties of any kind, whether express or implied. We do not guarantee that the service will be available at all times, or that it will be free of errors or interruptions.
          </Typography>

          <Typography variant="h6" component="h2" gutterBottom>
            4. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            In no event shall we be liable for any damages arising out of the use or inability to use this service, even if we have been advised of the possibility of such damages. This includes, but is not limited to, direct, indirect, incidental, and consequential damages.
          </Typography>

          <Typography variant="h6" component="h2" gutterBottom>
            5. Changes to the Service
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to modify, suspend, or discontinue the service at any time without notice. We also reserve the right to update these Terms and Conditions at any time. Any changes will be posted on this page, and the "Effective Date" will be updated accordingly.
          </Typography>

          <Typography variant="h6" component="h2" gutterBottom>
            6. Governing Law
          </Typography>
          <Typography variant="body1" paragraph>
            These Terms and Conditions are governed by and construed in accordance with the laws of United Kingdom. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in United Kingdom.
          </Typography>

          <Typography variant="h6" component="h2" gutterBottom>
            7. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions or concerns about these Terms and Conditions, please contact us through GitHub project.
          </Typography>

          <Typography variant="body2" color="textSecondary">
            Last Updated: <b>10.08.2024</b>
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper square={false} elevation={4} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Privacy Policy
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Effective Date: <b>10.08.2024</b>
          </Typography>

          <Typography variant="h6" component="h2" gutterBottom>
            1. Introduction
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to <b>thingoncloud.com</b> ("we," "our," or "us"). We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we handle your information when you use our service.
          </Typography>

          <Typography variant="h6" component="h2" gutterBottom>
            2. Information We Do Not Collect
          </Typography>
          <Typography variant="body1" paragraph>
            We do not collect, store, or process any personal data. This includes, but is not limited to:
          </Typography>
          <Box ml={2}>
            <Typography variant="body1" component="ul">
              <li>Names</li>
              <li>Email addresses</li>
              <li>IP addresses</li>
              <li>Browsing history</li>
              <li>Cookies or tracking data</li>
            </Typography>
          </Box>

          <Typography variant="h6" component="h2" gutterBottom>
            3. Usage Data
          </Typography>
          <Typography variant="body1" paragraph>
            We do not collect or monitor any usage data. Your interactions with our service are completely private, and no records of your activity are stored on our servers.
          </Typography>

          <Typography variant="h6" component="h2" gutterBottom>
            4. Third-Party Services
          </Typography>
          <Typography variant="body1" paragraph>
            We do not use any third-party services that track or collect your personal information.
          </Typography>

          <Typography variant="h6" component="h2" gutterBottom>
            5. Security
          </Typography>
          <Typography variant="body1" paragraph>
            Since we do not store any user data, there is no information at risk of being exposed or compromised.
          </Typography>

          <Typography variant="h6" component="h2" gutterBottom>
            6. Changes to This Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to modify this Privacy Policy at any time. Any changes will be posted on this page, and the "Effective Date" will be updated accordingly.
          </Typography>

          <Typography variant="h6" component="h2" gutterBottom>
            7. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions or concerns about this Privacy Policy, please contact us through GitHub project.
          </Typography>

          <Typography variant="body2" color="textSecondary">
            Last Updated: <b>10.08.2024</b>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
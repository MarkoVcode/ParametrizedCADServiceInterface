import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

interface InfoProps {
  children?: React.ReactNode;
}

export default function ModelInfo(props: InfoProps) {
  return (
    <>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h6" component="div">
            {props.model.name}
          </Typography>
        </Stack>
        <Typography color="text.secondary" variant="body2">
          {props.model.description}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography gutterBottom variant="body2">
          Labels
        </Typography>
        <Stack direction="row" spacing={1}>
          {props.model.labels.map((label) => (
            <Chip label={label} size="small" key={label} />
          ))}
        </Stack>
      </Box>
    </>
  );
}

//                    <Chip color="primary" label="Soft" size="small" />
//<Chip label="Medium" size="small" />
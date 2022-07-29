import React, { useCallback, useState } from 'react';
import { TextField, Button, MenuItem, Box } from '@mui/material';
import { VideoToSave } from '../../common/interfaces';
import { getAuthors } from '../../services/authors';
import { getCategories } from '../../services/categories';
import { useResolveData } from '../../common/hooks';
import { isFunction } from '../../utils/isWhat';

interface VideoFormProps {
  video?: VideoToSave;
  onSubmit?: (values: VideoToSave) => void;
  onCancel?: () => void;
}

const VideoForm = (props: VideoFormProps) => {
  const { video, onSubmit, onCancel } = props;
  const { data } = useResolveData(() => Promise.all([getAuthors(), getCategories()]));
  const [authors, categories] = data || [];

  const [values, setValues] = useState<any>(video ?? {});

  const handleChange = useCallback(
    (e: any) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
    [values]
  );

  const handleSubmit = () => {
    if (isFunction(onSubmit)) {
      onSubmit(values);
    }
  };

  const handleCancel = () => {
    if (isFunction(onCancel)) {
      onCancel();
    }
  };

  return (
    <form id="video">
      <TextField value={values.name || ''} onChange={handleChange} fullWidth name="name" label="Video name" size="medium" required />
      <TextField
        select
        fullWidth
        margin="normal"
        name="authorId"
        label="Author name"
        value={values.authorId || ''}
        onChange={handleChange}
        required>
        {authors?.map((author) => (
          <MenuItem key={author.id} value={author.id}>
            {author.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        fullWidth
        SelectProps={{ multiple: true }}
        margin="normal"
        name="categories"
        label="Video category"
        value={values.categories || []}
        onChange={handleChange}
        required>
        {categories?.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>
      <Box sx={{ mt: 2 }}>
        <Button onClick={handleSubmit} variant="contained" size="large" color="primary" sx={{ mr: 2 }}>
          Submit
        </Button>
        <Button onClick={handleCancel} variant="contained" size="large" color="inherit">
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default React.memo(VideoForm);

import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { Ride } from '../../../../../../../api-client';
import { DRIVER_CAPABILITIES } from '../../../Volunteers/Volunteers.constants';

function EditRideInfo({ ride }: { ride: Ride }) {
  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<Ride>();

  useEffect(() => {
    setValue('firstName', ride.firstName || '');
    setValue('origin', ride.origin || '');
    setValue('cellphone', ride.cellphone || '');
    setValue('lastName', ride.lastName || '');
    setValue('destination', ride.destination || '');
    setValue('comment', ride.comment || '');
    setValue('specialRequest', ride.specialRequest || []);
  }, [ride, setValue]);

  const selectedSpecialRequests = watch('specialRequest', []);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-8 flex-1">
        <FormControl>
          <TextField
            required
            label="שם פרטי"
            variant="outlined"
            fullWidth
            error={!!errors.firstName}
            {...register('firstName', { required: true, minLength: 2 })}
          />
          {errors.firstName && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.firstName.type === 'required' && 'יש להזין ערך'}
              {errors.firstName.type === 'minLength' && 'חייב להכיל לפחות 2 תווים'}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <TextField
            required
            label="כתובת איסוף"
            variant="outlined"
            fullWidth
            error={!!errors.origin}
            {...register('origin', { required: true, minLength: 2 })}
          />
          {errors.origin && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.origin.type === 'required' && 'יש להזין ערך'}
              {errors.origin.type === 'minLength' && 'חייב להכיל לפחות 2 תווים'}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <TextField
            required
            label="טלפון ליצירת קשר"
            variant="outlined"
            fullWidth
            type="string"
            error={!!errors.cellphone}
            {...register('cellphone', {
              required: true,
              pattern: /^05\d-?\d{7}$/
            })}
          />
          {errors.cellphone && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.cellphone.type === 'required' && 'יש להזין ערך'}
              {errors.cellphone.type === 'pattern' && 'יש להקליד מספר טלפון תקין'}
            </FormHelperText>
          )}
        </FormControl>
        <div className="flex flex-col gap-8 flex-1">
          <FormControl className="flex flex-col gap-2">
            <InputLabel id="special-requests-label">בקשות מיוחדות</InputLabel>
            <Select
              labelId="special-requests-label"
              aria-labelledby="special-requests-label"
              id="special-requests"
              multiple
              input={<OutlinedInput label="בקשות מיוחדות" />}
              {...register('specialRequest')}
              value={selectedSpecialRequests}
              renderValue={(selected: unknown[]) =>
                (selected as string[])
                  .map(
                    (value) =>
                      DRIVER_CAPABILITIES.find((capability) => capability.value === value)?.label
                  )
                  .join(', ')
              }
              style={{ maxWidth: '310px' }}
            >
              {DRIVER_CAPABILITIES.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  <Checkbox checked={(selectedSpecialRequests ?? []).includes(value)} />
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="flex flex-col gap-8 flex-1">
        <FormControl>
          <TextField
            required
            label="שם משפחה"
            variant="outlined"
            fullWidth
            error={!!errors.lastName}
            {...register('lastName', { required: true, minLength: 2 })}
          />
          {errors.lastName && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.lastName.type === 'required' && 'יש להזין ערך'}
              {errors.lastName.type === 'minLength' && 'חייב להכיל לפחות 2 תווים'}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <TextField
            required
            label="כתובת יעד"
            variant="outlined"
            fullWidth
            error={!!errors.destination}
            {...register('destination', { required: true, minLength: 2 })}
          />
          {errors.destination && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.destination.type === 'required' && 'יש להזין ערך'}
              {errors.destination.type === 'minLength' && 'חייב להכיל לפחות 2 תווים'}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <TextField
            id="passengerCount"
            required
            label="מספר נוסעים"
            type="number"
            inputProps={{ min: 1, max: 12, inputMode: 'numeric' }}
            defaultValue={ride.passengerCount || 0}
            error={!!errors?.passengerCount}
            {...register('passengerCount', { required: true })}
            sx={{
              '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button':
                {
                  opacity: 1
                }
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="תיאור הנסיעה"
            type="string"
            placeholder="הסבר קצר לגבי תיאור הנסיעה"
            multiline
            maxRows={3}
            error={!!errors?.comment}
            {...register('comment', {
              maxLength: 100
            })}
            inputProps={{
              maxLength: 100
            }}
          />
          <span
            className={`absolute top-1 left-1 text-xs ${
              (watch().comment?.length || 0) >= 100 ? 'text-red-500' : ''
            }`}
          >
            {watch().comment?.length || 0} / 100
          </span>
          {errors.comment && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.comment.type === 'maxLength' && 'הגעתם למקסימום אורך ההודעה המותר'}
            </FormHelperText>
          )}
        </FormControl>
      </div>
    </div>
  );
}

export default EditRideInfo;

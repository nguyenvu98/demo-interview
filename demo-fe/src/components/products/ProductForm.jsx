import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  description: z.string().optional(),
  price: z.coerce.number().nonnegative('Price must be >= 0'),
  inventory: z.coerce.number().int().nonnegative('Inventory must be >= 0'),
});

export default function ProductForm({ initialValues, onSubmit, submitText = 'Save', onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues || { name: '', description: '', price: 0, inventory: 0 },
  });

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name
        <input {...register('name')} />
        {errors.name && <span className="field-error">{errors.name.message}</span>}
      </label>
      <label>
        Description
        <textarea {...register('description')} rows={3} />
      </label>
      <label>
        Price
        <input type="number" step="0.01" {...register('price')} />
        {errors.price && <span className="field-error">{errors.price.message}</span>}
      </label>
      <label>
        Inventory
        <input type="number" {...register('inventory')} />
        {errors.inventory && <span className="field-error">{errors.inventory.message}</span>}
      </label>
      <div className="actions">
        <button type="submit" disabled={isSubmitting}>
          {submitText}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

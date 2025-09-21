import toast from 'react-hot-toast';

export async function withToast<T>(fn: () => Promise<T>, successMsg = "Saved successfully!"): Promise<T> {
    try {
        const result = await fn();
        toast.success(successMsg);
        return result;
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Unexpected error";
        toast.error(message);
        throw e;
    }
}

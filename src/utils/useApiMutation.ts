import { useState } from "react";

export function useApiMutation<TPayload, TResult>(
    request: (payload: TPayload) => Promise<TResult>
) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const mutate = async (payload: TPayload): Promise<TResult | null> => {
        setLoading(true);
        setError(null);
        try {
            return await request(payload);
        } catch (err) {
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { mutate, loading, error };
}

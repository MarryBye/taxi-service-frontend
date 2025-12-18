import { useState } from "react";

export function useApiMutation<TPayload, TResult = void>(
    request: (payload: TPayload) => Promise<{ data: TResult }>
) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const mutate = async (payload: TPayload): Promise<TResult | null> => {
        setLoading(true);
        setError(null);

        try {
            const res = await request(payload);
            return res.data;
        } catch (err) {
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { mutate, loading, error };
}

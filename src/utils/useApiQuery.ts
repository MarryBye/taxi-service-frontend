import { useCallback, useEffect, useState } from "react";

export function useApiQuery<T>(
    request: () => Promise<T>,
    deps: any[] = []
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            setData(await request());
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, deps);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { data, loading, error, refetch: fetch };
}

import React from 'react';
import { useState, useEffect, useCallback } from "react";

export function useAxios(
    request: () => Promise<{ data: T }>,
    deps: any[] = []
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await request();
            setData(res.data);
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
import { useDeferredValue, useMemo, useState } from 'react';
import debouce from 'lodash.debounce';

function useSearch<T>(searcher: (value: string) => T) {
	const [search, setSearch] = useState('');
	const deferredQuery = useDeferredValue(search);

	const results: T = useMemo(() => searcher(deferredQuery), [deferredQuery, searcher]);
	const handleSearch = useMemo(
		() =>
			debouce((e) => {
				const value = e.target.value;
				setSearch(value);
			}, 500),
		[]
	);

	return { results, handleSearch };
}

export default useSearch;

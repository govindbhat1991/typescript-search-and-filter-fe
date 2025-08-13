import React, { useMemo, useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import debounce from "lodash.debounce";

interface Props {
  onSearch: (q: string) => void;
  getSuggestions: (q: string) => Promise<string[]>;
}

export default function SearchBar({ onSearch, getSuggestions }: Props) {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  const fetch = useMemo(
    () =>
      debounce(async (q: string) => {
        try {
          const list = await getSuggestions(q);
          setOptions(list);
        } catch {}
      }, 300),
    [getSuggestions]
  );

  return (
    <Autocomplete
      freeSolo
      options={options}
      onInputChange={(_, v) => {
        setInput(v);
        fetch(v);
      }}
      onChange={(_, v) => {
        if (typeof v === "string") {
          onSearch(v);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          placeholder="Search..."
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch(input);
          }}
        />
      )}
      sx={{ minWidth: 360 }}
    />
  );
}

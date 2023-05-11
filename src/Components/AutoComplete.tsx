import { CaretDown, CircleNotch } from '@phosphor-icons/react';
import clsx from 'clsx';
import debounce from 'lodash.debounce';
import { FocusEvent, useEffect, useRef, useState } from 'react';

const options = [
  { id: 1, label: 'option 1' },
  { id: 2, label: 'option 2' },
  { id: 3, label: 'option 3' },
];

type Option = {
  id: number | string;
  label: string;
};

type AutoCompleteProps = {
  onChange: (value: Option) => void;
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getOptions(search?: string) {
  await delay(500);
  return !search
    ? options
    : options.filter((o) =>
        o.label.toLowerCase().startsWith(search.toLowerCase()),
      );
}

const AutoComplete = ({ onChange }: AutoCompleteProps) => {
  const inputSearch = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [optionSelected, setOptionSelected] = useState<Option>();
  const [options, setOptions] = useState<Option[] | null>(null);

  function handleBlur(e: FocusEvent<HTMLDivElement, Element>) {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        setOpen(false);
        if (inputSearch.current) {
          if (!optionSelected) {
            inputSearch.current.value = '';
          } else {
            inputSearch.current.value = optionSelected.label;
          }
        }
      }
    }, 0);
  }

  function handleSelectOption(option: Option) {
    setOpen(false);
    onChange(option);
    setOptionSelected(option);
    setOptions([option]);
    if (inputSearch.current) inputSearch.current.value = option.label;
  }

  const debouncedFetchApi = debounce(async (data) => {
    setLoading(true);
    setOptions(await getOptions(data));
    setLoading(false);
  }, 1000);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    debouncedFetchApi(e.target.value);
  }

  useEffect(() => {
    console.log(options);
  }, [options]);

  return (
    <div tabIndex={1} className="relative text-gray-700" onBlur={handleBlur}>
      <div className="flex items-center border p-1 rounded-md shadow-md focus-within:ring-2 focus-within:ring-blue-500">
        <input
          className="flex-1 py-2 px-3 focus:ring-0 focus:outline-0"
          placeholder="Select an option"
          ref={inputSearch}
          onChange={handleChange}
          onClick={() => {
            setOpen(true);
          }}
        />
        {loading ? (
          <span className="px-3 animate-spin">
            <CircleNotch />
          </span>
        ) : (
          <span className="px-3">
            <CaretDown />
          </span>
        )}
      </div>
      {options && (
        <ul
          className={clsx(
            'w-full bg-white cursor-pointer mt-1 border rounded-md shadow-md',
            { hidden: !open },
            { absolute: open },
          )}
        >
          {options.map((option) => (
            <li
              key={option.id}
              className="py-1 px-2 hover:bg-blue-200"
              onClick={() => handleSelectOption(option)}
            >
              <span className="capitalize">{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;

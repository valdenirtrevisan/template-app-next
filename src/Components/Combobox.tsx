import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  FocusEvent,
} from 'react';
import { debounce } from 'lodash';
import { CircleNotch } from '@phosphor-icons/react';

export type Option = {
  id: string;
  label: string;
};

type ComboboxProps = {
  getOptions: (filter: string) => Promise<Option[]>;
  onSelect: (option?: Option) => void;
};

export const Combobox: React.FC<ComboboxProps> = ({ getOptions, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const comboboxRef = useRef<HTMLDivElement>(null);

  const delayedGetOptions = useRef(
    debounce(async (value: string) => {
      setIsLoading(true);
      const filteredOptions = await getOptions(value);
      setOptions(filteredOptions);
      setIsLoading(false);
    }, 1000),
  ).current;

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setHighlightedIndex(-1);
    setIsOpen(true);
    delayedGetOptions(value);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex <= 0 ? options.length - 1 : prevIndex - 1,
      );
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex === options.length - 1 ? 0 : prevIndex + 1,
      );
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (highlightedIndex >= 0) {
        const selectedOption = options[highlightedIndex];
        setInputValue(selectedOption.label);
        onSelect(selectedOption);
        setIsOpen(false);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
    } else if (event.key === 'Backspace') {
      onSelect(undefined);
    }
  };

  const handleOptionClick = (option: Option) => {
    setInputValue(option.label);
    onSelect(option);
    setIsOpen(false);
  };

  const handleOptionMouseEnter = (index: number) => {
    setHighlightedIndex(index);
  };

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        setIsOpen(false);
      }
    }, 0);
  };

  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  return (
    <div
      tabIndex={0}
      className="relative"
      ref={comboboxRef}
      onBlur={handleBlur}
    >
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onClick={handleInputClick}
        ref={inputRef}
        onFocus={() => setIsOpen(true)}
        className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isLoading && (
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <CircleNotch className="animate-spin" />
        </span>
      )}
      {isOpen && options.length > 0 && (
        <ul
          role="listbox"
          aria-label="Options"
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
        >
          {options.map((option, index) => (
            <li
              key={option.id}
              role="option"
              aria-selected={index === highlightedIndex}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => handleOptionMouseEnter(index)}
              className={`px-4 py-2 cursor-pointer ${
                index === highlightedIndex ? 'bg-blue-500 text-white' : ''
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

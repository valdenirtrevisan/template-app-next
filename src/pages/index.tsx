import { Button } from '@/components/Button';
import { DemoContainer } from '@/components/DemoContainer';
import { useTheme } from 'next-themes';

const Page = () => {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <DemoContainer>
      <Button onClick={handleChangeTheme}>mudar tema</Button>
    </DemoContainer>
  );
};

export default Page;

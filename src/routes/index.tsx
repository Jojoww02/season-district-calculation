import { createFileRoute } from '@tanstack/react-router';
import DistrictSeasonCalculatorPage from '../pages/DistrictSeasonCalculatorPage';

export const Route = createFileRoute('/')({
  component: DistrictSeasonCalculatorPage,
});

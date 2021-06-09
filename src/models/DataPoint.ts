export interface DataPoint {
  name: string;
  value: number;
}

export const DataPointHelpers = {
  getTotal: (data: Array<DataPoint>) => {
    return data.reduce(
      (accumulator, currentValue) => accumulator + currentValue.value,
      0
    );
  },
};

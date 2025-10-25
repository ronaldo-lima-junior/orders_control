type UseCase<InputData, OutputData> = {
  execute(inputData: InputData): Promise<OutputData> | OutputData;
};

export default UseCase;

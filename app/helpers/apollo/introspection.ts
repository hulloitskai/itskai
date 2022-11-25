
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "Identifiable": [
      "ICloudCredentials",
      "ObsidianNote",
      "ObsidianStub",
      "User"
    ],
    "Node": [
      "ICloudCredentials",
      "ObsidianNote",
      "ObsidianStub",
      "User"
    ],
    "ObsidianEntry": [
      "ObsidianNote",
      "ObsidianStub"
    ]
  }
};
      export default result;
    
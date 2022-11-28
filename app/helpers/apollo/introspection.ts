
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "Identifiable": [
      "ICloudCredentials",
      "OAuthCredentials",
      "ObsidianNote",
      "ObsidianStub",
      "User"
    ],
    "Node": [
      "ICloudCredentials",
      "OAuthCredentials",
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
    
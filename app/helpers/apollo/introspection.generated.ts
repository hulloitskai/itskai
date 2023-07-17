
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "Node": [
      "ICloudCredentials",
      "Image",
      "JournalEntry",
      "Location",
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
    
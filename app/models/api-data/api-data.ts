import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Api } from "../../services/api";

const api = new Api();
api.setup();
/**
 * Model description here for TypeScript hints.
 */
export const ApiDataModel = types
  .model("ApiData")
  .props({
    categoryData: types.optional(types.frozen(), [])
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({

    getApiData: flow(function* getApiData(categoryNumber: number) {
      try {
        const res = yield api.getApiData(categoryNumber);
        console.tron.log('data', res.data.data.data)
        if (res.kind === "ok" && res.data.status == 200) {
          if (res.data.ok) {
            self.categoryData = res.data.data.data;
            console.tron.log(self.categoryData);
          }
        }
        else {
          // return { response: false, message: data.message };
        }
      } catch (error) {
        // return { response: false, message: "Something went wrong." };
      }
      return { response: false, message: "Something went wrong." };
    }),

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type ApiDataType = Instance<typeof ApiDataModel>
export interface ApiData extends ApiDataType { }
type ApiDataSnapshotType = SnapshotOut<typeof ApiDataModel>
export interface ApiDataSnapshot extends ApiDataSnapshotType { }

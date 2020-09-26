import { GeneralApiProblem } from "./api-problem"

export interface User {
  id: number
  name: string
}

export interface Data {
  id: number,
  parent_id: number,
  name: string,
  icon: string,
  type: string,
  round: number,
  round_time: string,
  rest_time: string,
  workout_setting: boolean,
  has_child: boolean,
  media: Media[]
}

export interface Media {
  id: number,
  category_id: number,
  url: string,
  caption: string,
  type: string,
  video_cover: string,
  description: string,
  sort: number,
  duration: null,
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type GetData = { kind: 'ok', data: any } | GeneralApiProblem

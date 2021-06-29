import IDeserialize from "app/interfaces/deserialize";
import ElectionLimitItem from "../models/ElectionLimitItem";
import ElectionCandidateItem from "../models/ElectionCandidateItem";

export default class DetailElectionResponse implements IDeserialize
{
    key: number;
    title: string;
    startDate: string;
    endDate: string;
    iplimit: boolean;
    iplist: string;
    electionLimitItems: ElectionLimitItem[] = [];
    electionCandidateItems: ElectionCandidateItem[] = [];

    deserialize(input: any): this
    {
        Object.assign(this, input);
        return this;
    }
}

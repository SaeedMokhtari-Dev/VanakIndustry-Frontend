import IDeserialize from "app/interfaces/deserialize";

export default class DetailElectionCandidateTypeResponse implements IDeserialize
{
    key: string;
    title: string;

    deserialize(input: any): this
    {
        Object.assign(this, input);
        return this;
    }
}

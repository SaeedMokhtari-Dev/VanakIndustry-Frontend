import IDeserialize from "app/interfaces/deserialize";

export default class PresentElectionResponse implements IDeserialize
{
    electionId: number;
    electionTitle: string;
    
    deserialize(input: any): this
    {
        Object.assign(this, input);
        return this;
    }
}

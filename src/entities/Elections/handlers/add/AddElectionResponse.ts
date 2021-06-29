import IDeserialize from "app/interfaces/deserialize";

export default class AddElectionResponse implements IDeserialize
{
    deserialize(input: any): this
    {
        Object.assign(this, input);
        return this;
    }
}

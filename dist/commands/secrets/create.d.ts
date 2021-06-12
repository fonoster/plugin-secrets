import { Command, flags } from "@oclif/command";
export default class CreateCommand extends Command {
    static description: string;
    static args: {
        name: string;
    }[];
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        "from-literal": flags.IOptionFlag<string | undefined>;
        "from-stdin": import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    run(): Promise<void>;
}

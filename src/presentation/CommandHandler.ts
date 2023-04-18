import { Command } from './Command'
import { SearchCountriesByAnimals } from './../searchCountriesByAnimals/SearchCountriesByAnimals'
export class CommandHandler {
  constructor(
    private readonly args: string[],
    private readonly searchCountriesByAnimals: SearchCountriesByAnimals,
  ) {}

  handle = () => {
    if (this.args.length > 1) {
      throw new Error('Invalid command, only one argument allow')
    }

    const formattedArgument = this.formatArgument(this.args[0])

    return this.handler[formattedArgument.command](
      formattedArgument.commandValue,
    )
  }

  private handler = {
    [Command.SEARCH_COUNTRIES_BY_ANIMALS]:
      this.searchCountriesByAnimals.execute,
  }

  private formatArgument = (
    arg: string,
  ): { command: Command; commandValue: string } => {
    if (arg.slice(0, 2) !== '--') {
      throw new Error("Invalid arguments, should start with '--'")
    }

    const longArg = arg.split('=')
    const command = this.getMatchingCommand(
      longArg[0].slice(2, longArg[0].length),
    )

    if (!command) {
      throw new Error('Invalid arguments, command not found')
    }

    const commandValue = longArg.length > 1 ? longArg[1] : ''
    return { command, commandValue }
  }

  private getMatchingCommand = (command: string): Command | undefined => {
    return Object.values<string>(Command).includes(command)
      ? (command as Command)
      : undefined
  }
}

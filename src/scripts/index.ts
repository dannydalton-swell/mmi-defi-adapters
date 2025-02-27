#!/usr/bin/env node
import { Command } from 'commander'
import 'dotenv/config'
import { DefiProvider } from '../defiProvider'
import { blockAverage } from './blockAverage'
import { buildMetadata } from './buildMetadata'
import { buildSnapshots } from './buildSnapshots'
import { buildContractTypes } from './buildTypes'
import { featureCommands } from './featureCommands'
import { newAdapterCommand } from './newAdapterCommand'

const program = new Command('mmi-adapters')

const defiProvider = new DefiProvider()
const chainProviders = defiProvider.chainProvider.providers
const adaptersController = defiProvider.adaptersController

featureCommands(program, defiProvider)

newAdapterCommand(program, defiProvider)

blockAverage(program, chainProviders)

buildContractTypes(program)

buildMetadata(program, chainProviders, adaptersController)

buildSnapshots(program, defiProvider)

program.parseAsync()

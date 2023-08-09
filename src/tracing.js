const { WebTracerProvider } = require('@opentelemetry/sdk-trace-web');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { ZoneContextManager } = require('@opentelemetry/context-zone');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { getWebAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-web');
const { Resource } = require('@opentelemetry/resources');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');


export const provider = new WebTracerProvider({
  resource: Resource.default().merge(new Resource({
    // Replace with any string to identify this service in your system
    'service.name': 'vue-sample-app',
  })),
});

const exporterOptions = {
  url: 'http://localhost:4318/v1/traces',
}

const traceExporter = new OTLPTraceExporter(exporterOptions)

provider.addSpanProcessor(new SimpleSpanProcessor(traceExporter));

provider.register({
  contextManager: new ZoneContextManager(),

});

// Registering instrumentations
registerInstrumentations({
  instrumentations: [
    getWebAutoInstrumentations(),
  ],
});
console.log('Tracing service started');
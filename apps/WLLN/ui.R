require("shiny", warn.conflicts = FALSE)
require("htmltools")


shinyUI(fluidPage(withMathJax(),HTML('<style type="text/css">
                                     .col-sm-12 { text-align: center; }
                                     body { background-color: #dfe4f2; }
                                     </style>'),
                  sidebarPanel(   sliderInput(inputId="sampleSize", "Number of Throws", animate=animationOptions(interval=500),value=1, min=1, max=250,step=1),
                                  actionButton("setSeed","New Sample"),br(),br(),
                                  p("This example simulates the throwing of a dice. We calculate the sample mean $\\bar{X}_i$ for every $i=1,\\dots ,n$ throws and plot it against $n$.")
                  ),                           
                  mainPanel(   
                         plotOutput("distPlot")                                             
                  )
                  ,
                  fluidRow(column(12,br(),
                                  div(includeMarkdown("apps/WLLN/formula.Rmd"))
                                  
                  ))
)
)

library(shiny)
library(ggplot2)

set <- 1:6
N <- 250
check <- FALSE
sampleMean <- cumsum(sample(set,size=N,replace=TRUE))/(1:250)
mse  <- round(cumsum((sampleMean-3.5)^2)/(1:N),4)

plot <- ggplot() + ylab(expression(bar(X)[n])) + xlab(expression(n)) +
    xlim(1,250) + scale_y_continuous(limits=c(0.75,6.25),labels=paste(1:6), breaks=1:6) +
    geom_hline(yintercept=3.5,size=1) +
    theme(panel.background=element_rect(fill=grey(0.9)), panel.grid.major.x=element_blank(),panel.grid.minor=element_blank()) +
    theme(axis.text = element_text(face="bold",size=13), axis.title = element_text(face="bold",size=13)) +
    geom_point(data=data.frame("start"=sampleMean[1]),aes(y=start,x=1),size=3,color="red") +
    annotate("text", x=200, y=6, hjust=0, label=paste("MSE: ", mse[1]))

shinyServer(function(input, output, session) {
        
    observe({
        if(input$setSeed == 0) {
            return()
        } 
        isolate({
            ### Each time the button is pressed, create the new sample and calculate all mse's!
            sampleMean <<- cumsum(sample(set,size=N,replace=TRUE))/(1:N)
            mse <<- round(cumsum((sampleMean-3.5)^2)/(1:N),4)
            
            ### Update the slider in UI
            updateSliderInput(session,inputId="sampleSize", value=1, min=1, max=250,step=1)  
            ### Draw new starting value by updating the ggplot layer
            plot$layers[[2]] <<- geom_point(data=data.frame("start"=sampleMean[1]),aes(y=start,x=1),size=3,color="red")
            plot$layers[[3]] <<- annotate("text", x=200, y=6, hjust=0, label=paste("MSE: ", mse[1]))
            ### Button has been pressed -> check = TRUE
            check <<- TRUE
        })  
    })
    
    observe({
        ### If sampleSize is higher than 1, the button could'nt have been pressed recently, so check = FALSE
        if(input$sampleSize>1) {
            check <<- FALSE
        }  
    })
       
    output$distPlot = renderPlot({
        input$setSeed
    
        n <- input$sampleSize
        series     <- sampleMean[1:n]
        currentMse <- mse[n]
        
        if(n>1 & check==FALSE) {
            data <- data.frame("N"=1:n,"X"=series)
            plot$layers[[3]] <<- annotate("text", x=200, y=6, hjust=0, label=paste("MSE: ", currentMse))
            plot + geom_line(data=data,aes(x=N,y=X),colour="steelblue", size=1.2) 
                   
        } else {
            plot
        } 
    })   
})
